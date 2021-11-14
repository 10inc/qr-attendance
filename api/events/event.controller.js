const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const service = require('./event.service');

// routes
router.get('/', authorize([Role.Admin, Role.Organizer]), getAll);
router.get('/:id', authorize([Role.Admin, Role.Organizer]), getById);
router.post('/', authorize([Role.Admin, Role.Organizer]), createSchema, create);
router.put('/:id', authorize([Role.Admin, Role.Organizer]), updateSchema, update);
router.delete('/:id', authorize([Role.Admin, Role.Organizer]), _delete);

module.exports = router;

function getAll(req, res, next) {
    service.getAll()
        .then(events => res.json(events))
        .catch(next);
}

function getById(req, res, next) {
    service.getById(req.params.id)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    service.create(req.body)
        .then(event => res.json(event))
        .catch(next);
}

function update(req, res, next) {
    service.update(req.params.id, req.body)
        .then(event => res.json(event))
        .catch(next);
}

function _delete(req, res, next) {
    eventService.delete(req.params.id)
        .then(() => res.json({ message: 'Event deleted successfully' }))
        .catch(next);
}

// SCHEMAS
function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        date: Joi.date().required(),
        attendees: Joi.array().items(Joi.string())
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        name: Joi.string().required(),
        date: Joi.date().required(),
        attendees: Joi.array().items(Joi.string())
    };

    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}
