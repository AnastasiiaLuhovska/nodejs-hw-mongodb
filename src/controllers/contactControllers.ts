import {deleteContact, getContacts, getContactsById, postContact, updateContact} from "../services/contacts";
import {AsyncController} from "../types/types";
import createHttpError from "http-errors";
import {parsePaginationParams} from "../utils/parsePaginationParams";
import {parseSortParams} from "../utils/parseSortParams";
import {parseFilterParams} from "../utils/parseFilterByType";

export const getContactController: AsyncController = async (req, res, next) => {
    const {parsedPage, parsedPerPage} = parsePaginationParams(req.query)
    const {parsedSortBy, parsedSortOrder} = parseSortParams(req.query)
    const filters = parseFilterParams(req.query)

    const data = await getContacts({parsedPage, parsedPerPage, parsedSortBy, parsedSortOrder, filters, userId: req.user._id})
    res.json({
        status: 200,
        message: "Contact were found successfully",
        data: data
    })
};

export const getContactBytIdController: AsyncController = async (req, res, next) => {
    const data = await getContactsById(req.params.contactId, req.user)
    if (!data) {
        next(createHttpError(404, 'Contact was not found'))
        return
    }
    res.json({
        status: 200,
        message: 'Contact was found successfully',
        data
    })
}

export const postContactController: AsyncController = async (req, res, next) => {
    const data = await postContact(req.body, req.user, req.file)
    res.status(201).json({
        status: 201,
        message: 'Contact was successfully created',
        data

    })
};
export const deleteContactController: AsyncController = async (req, res, next) => {
    const data = await deleteContact(req.params.contactId, req.user)

    if (!data) {
        next(createHttpError(404, 'Contact was not found'))
        return
    }
    res.status(204).send()
};

export const patchContactController: AsyncController = async (req, res, next) => {
    const data = await updateContact(req.params.contactId, req.user, req.body, req.file)
    if (!data.value) {
        next(createHttpError(404, 'Contact was not found'))
        return
    }
    res.json({
        status: 200,
        message: 'Contact was updated successfully',
        data: data.value
    })
};