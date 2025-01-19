import { Request, Response } from "express";
import {
    acceptAssignmentService,
    addAssignmentService,
    deleteAssignmentService,
    getAllAssignmentsService,
    getAssignmentByIdService,
    reconsiderAssignmentService,
    rejectAssignmentService,
    updateAssignmentService,
} from "./assignmentService";
import { AssignmentDelete, AssignmentFetch, AssignmentStatusUpdate } from "./assignmentModel";

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

export const deleteAssignmentById = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const assignmentId: AssignmentDelete = { id: String(req.params.id) };
        const assignment = await deleteAssignmentService(assignmentId);

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
            details: `Error while deleting assignment by id : ${error}`,
        });
    }
};

export const acceptAssignment = async (req: Request, res: Response) => {
    try {
        const assignmentId: AssignmentStatusUpdate = { id: String(req.params.id) };
        const assignment = await acceptAssignmentService(assignmentId);

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
            details: `Error while accepting assignment by id : ${error}`,
        });
    }
};

export const rejectAssignment = async (req: Request, res: Response) => {
    try {
        const assignmentId: AssignmentStatusUpdate = { id: String(req.params.id) };
        const assignment = await rejectAssignmentService(assignmentId);

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
            details: `Error while rejecting assignment by id : ${error}`,
        });
    }
};

export const reconsiderAssignment = async (req: Request, res: Response) => {
    try {
        const assignmentId: AssignmentStatusUpdate = { id: String(req.params.id) };
        const assignment = await reconsiderAssignmentService(assignmentId);

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
            details: `Error while reconsider assignment by id : ${error}`,
        });
    }
};

export const updateAssignment = async (req: Request, res: Response) => {
    try {
        const assignmentId = String(req.params.id);
        const assignment = await updateAssignmentService(assignmentId, req.body);
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
            details: `Error while updating assignment : ${error}`,
        });
    }
};
