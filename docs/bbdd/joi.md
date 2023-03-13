---
sidebar_position: 5
---

# Joi

## Overview

Joi nos permite validar los datos y esquemas para JavaScript. Es muy útil para asegurarse que los diferentes atributos del documento tengan la entrada precisa y no se puedan hacer inserciones en con datos no validados.

### Validaciones

Como podemos observar, podemos crear una clase validación con distintos métodos que servirán para la evaluación de nuestros datos antes de operaciones con **moongose**. Podremos trabajar con distintos tipos de datos a través de los métodos `Joi.string()`, `Joi.number()`...

```ts title="backend/src/components/Projects/validation.ts"
import * as Joi from 'joi';
import Validation from '@/components/validation';
import { IProjectsModel } from './model';

/**
 * @export
 * @class ProjectsValidation
 * @extends Validation
 */
class ProjectsValidation extends Validation {
    /**
     * Creates an instance of ProjectsValidation.
     * @memberof ProjectsValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IProjectsModel} params
     * @returns {Joi.ValidationResult<IProjectsModel >}
     * @memberof ProjectsValidation
     */
    createProject(params: IProjectsModel): Joi.ValidationResult<IProjectsModel> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().optional(),
            version: Joi.string().optional(),
            link: Joi.string().optional(),
            tag: Joi.string().optional(),
            timestamp: Joi.number().optional()
        });

        return schema.validate(params);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof ProjectsValidation
     */
    getProject(body: {
        id: string;
    }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof ProjectsValidation
     */
    removeProject(body: {
        id: string;
    }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }
}

export default new ProjectsValidation();
```

Una vez creamos nuestro validador, podremos instanciarlo en nuestro código y pasarle un objeto JavaScript para validar que sus atributos sean correctos.

```ts title="backend/src/components/Projects/service.ts"
/**
     * @param {IProjectsModel} project
     * @returns {Promise < IProjectsModel >}
     * @memberof ProjectsService
     */
    async insert(body: IProjectsModel): Promise<IProjectsModel> {
        try {
            const validate: Joi.ValidationResult<IProjectsModel> = ProjectsValidation.createProject(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }
    ...
```
