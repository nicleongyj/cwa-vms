import { Request, Response } from "express";
import { supabase } from "../../lib/supabase";
import * as crypto from "crypto";
import fs from "fs";
import MyInfoConnector = require("myinfo-connector-v4-nodejs");

const { APP_CONFIG, MYINFO_CONNECTOR_CONFIG } = require("../../../config/config.js");
const connector = new MyInfoConnector(MYINFO_CONNECTOR_CONFIG);

let sessionIdCache: Record<string, string> = {};
let currentCodeVerifier: string | null = null;

export const generateCodeChallenge = async (req: Request, res: Response) => {
    try {
        const pkceCodePair = connector.generatePKCECodePair();

        const sessionId = crypto.randomBytes(16).toString("hex");
        sessionIdCache[sessionId] = pkceCodePair.codeVerifier;
        currentCodeVerifier = pkceCodePair.codeVerifier;

        res.cookie("sid", sessionId);

        const authUrl = constructSingpassAuthUrl(pkceCodePair.codeChallenge);
        console.log("Singpass Redirect Authorization URL:", authUrl);

        res.status(200).send({ codeChallenge: pkceCodePair.codeChallenge, sessionId });
    } catch (error) {
        console.error("Error generating code challenge:", error);
        res.status(500).send({ error });
    }
};

const constructSingpassAuthUrl = (codeChallenge: string): string => {
    const authApiUrl = APP_CONFIG.MYINFO_API_AUTHORIZE;
    const clientId = APP_CONFIG.DEMO_APP_CLIENT_ID;
    const redirectUri = APP_CONFIG.DEMO_APP_CALLBACK_URL;
    const scope = APP_CONFIG.DEMO_APP_SCOPES;
    const purpose_id = APP_CONFIG.DEMO_APP_PURPOSE_ID;
    const authUrl =
        authApiUrl +
        `?client_id=${clientId}` +
        `&scope=${scope}` +
        `&purpose_id=${purpose_id}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256` +
        `&response_type=code` +
        `&redirect_uri=${redirectUri}`;
    return authUrl;
};

export const getPersonData = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { authCode, sid } = req.body;
        // const sessionId = req.cookies.sid;
        const codeVerifier = currentCodeVerifier;

        if (!codeVerifier) {
            res.status(400).send({ error: "Session expired or missing code verifier" });
            return;
        }

        // Retrieve private keys from filesystem for signing and encryption
        const privateSigningKey = fs.readFileSync(
            APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_SIGNING_KEY,
            "utf8",
        );

        let privateEncryptionKeys: string[] = [];
        fs.readdirSync(APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_ENCRYPTION_KEYS).forEach((filename) => {
            privateEncryptionKeys.push(
                fs.readFileSync(
                    `${APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_ENCRYPTION_KEYS}/${filename}`,
                    "utf8",
                ),
            );
        });

        // Call MyInfo Connector to get the person data
        const personData = await connector.getMyInfoPersonData(
            authCode,
            codeVerifier,
            privateSigningKey,
            privateEncryptionKeys,
        );

        console.log("Person Data retrieved:", JSON.stringify(personData));
        res.status(200).send(personData); // Send the person data back to the frontend
    } catch (error) {
        console.error("Error retrieving person data:", error);
        res.status(500).send({ error });
    }
};

export const handleSingpassCallback = async function (req: Request, res: Response) {
    const authCode = req.query.code as string;

    if (!authCode) {
        res.status(400).send("Authorisation code not found");
        return;
    }

    try {
        const personData = await retrievePersonDataWithAuthCode(authCode);
        console.log(personData);
        res.status(200).json(personData);
    } catch (error) {
        console.log("Error retrieving person data");
        res.status(500).send({ error: "Error retrieving person data" });
    }
};

const retrievePersonDataWithAuthCode = async (authCode: string) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/auth/getPersonData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ authCode }),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Post request failed");
        }

        const personData = await response.json();
        return personData;
    } catch (error) {
        console.error("Error retrieving person data");
        throw error;
    }
};

export const confirmAuth = async function (req: Request, res: Response) {
    /**
     * Verifies the one time password link sent to confirm a user's email
     */
    const token_hash = String(req.query.token_hash);
    const type = req.query.type;
    const next = String(req.query.next ?? "/");

    if (token_hash && type === "email") {
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });
        if (!error) {
            res.redirect(303, `http://localhost:5173/${next.slice(1)}`);
            return;
        }
        console.log(error);
    }

    // Return the user to an error page with some instructions
    res.redirect(303, "http:localhost:5173/auth/auth-code-error");
};
