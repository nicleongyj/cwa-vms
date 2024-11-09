// src/types/myinfo-connector-v4-nodejs.d.ts

declare module "myinfo-connector-v4-nodejs" {
    interface MyInfoConnectorConfig {
        MYINFO_CONNECTOR_CONFIG: {
            [key: string]: any; // Replace with more specific config properties if needed
        };
    }

    class MyInfoConnector {
        constructor(config: MyInfoConnectorConfig);

        // Define the generatePKCECodePair method and its return type
        generatePKCECodePair(): { codeVerifier: string; codeChallenge: string };

        // Define the getMyInfoPersonData method and its return type
        getMyInfoPersonData(
            authCode: string,
            codeVerifier: string,
            privateSigningKey: string,
            privateEncryptionKeys: string[],
        ): Promise<any>; // Replace `any` with the actual return type if known
    }

    export = MyInfoConnector;
}
