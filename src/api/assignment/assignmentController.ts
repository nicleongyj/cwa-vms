import { Request, Response } from "express";
import {
    addAssignmentService,
    getAllAssignmentsService,
    getAssignmentByIdService,
} from "./assignmentService";
import { AssignmentFetch } from "./assignmentModel";

export const addAssignment = async (req: Request, res: Response) => {
    try {
        const assignment = await addAssignmentService(req.body);

        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({
            error_code: "ASGN201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while adding assignment : ${error} `,
        });
    }
};

export const getAssignments = async (req: Request, res: Response) => {
    try {
        const assignments = await getAllAssignmentsService();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({
            error_code: "ASGN201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while retrieving all assignments data : ${error}`,
        });
    }
};

export const getAssignmentById = async (req: Request, res: Response) => {
    try {
        const assignmentId: AssignmentFetch = { id: String(req.params.id) };
        const assignment = await getAssignmentByIdService(assignmentId);

        if (!assignment) {
            res.status(404).json({
                error_code: "ASGN301",
                message: "Assignment not found",
                details: `Assignment with ID '${assignmentId}' does not exist`,
            });
        } else {
            res.status(200).json(assignment);
        }
    } catch (error) {
        res.status(500).json({
            error_code: "ASGN201",
            message: "Unexpected server error, please contact support for help",
            details: `Error while retrieving assignment by id : ${error}`,
        });
    }
};
