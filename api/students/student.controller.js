const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const service = require('./student.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize([Role.Admin, Role.Organizer]), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(Role.Admin), updateSchema, update);
router.delete('/:id', authorize(Role.Admin), _delete);
router.post('/:id/qr', authorize(Role.Admin), email_qr);

module.exports = router;

// CRUD
function getAll(req, res, next) {
    service.getAll()
        .then(students => res.json(students))
        .catch(next);
}

function getById(req, res, next) {
    service.getById(req.params.id)
        .then(student => student ? res.json(student) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    service.create(req.body)
        .then(student => res.json(student))
        .catch(next);
}

function update(req, res, next) {
    service.update(req.params.id, req.body)
        .then(student => res.json(student))
        .catch(next);
}

function _delete(req, res, next) {
    service.delete(req.params.id)
        .then(() => res.json({ message: 'Student deleted successfully' }))
        .catch(next);
}

// Other

function email_qr(req, res, next) {
    service.email_qr(req.params.id)
        .then(() => res.json({ message: 'Student QR Code email sent successfully' }))
        .catch(next);
}

// SCHEMAS
function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        section: Joi.string().required(),
        year: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        name: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        section: Joi.string().empty(''),
        year: Joi.string().empty('')
    };

    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}
