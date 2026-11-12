import {Router} from "express";
import { OrganizationRepository } from "./organization.repository.js";
import { OrganizationService } from "./organization.service.js";
import { OrganizationController } from "./organization.controller.js";
import { validateParams } from "../../middlewares/validate.js";
import { createOrganizationSchema, organizationIdParamsSchema } from "./organization.schema.js";

const router = Router();

const organizationRepository = new OrganizationRepository();
const organizationService = new OrganizationService(organizationRepository);
const organizationController = new OrganizationController(organizationService);

router.get("/:id", validateParams(organizationIdParamsSchema), organizationController.findById);
router.post("/", validateParams(createOrganizationSchema), organizationController.createOne);

export {router as organizationRouter};
