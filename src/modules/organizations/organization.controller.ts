import type { OrganizationService } from "./organization.service.js";
import type { Request, Response } from "express";
import type { OrganizationIdParams } from "./organization.schema.js";

type OrganizationRequestLocals = {
  validatedParams: OrganizationIdParams;
};

export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  findById = async (
    _req: Request,
    res: Response<unknown, OrganizationRequestLocals>,
  ): Promise<void> => {
    const { id: organizationId } = res.locals.validatedParams;

    const organization = await this.service.getById(organizationId);
    if (!organization) {
      res.status(404).json({ status: "error", message: "Organization not found" });
      return;
    }
    res.status(200).json({
      status: "ok",
      data: organization,
    });
  }

  createOne = async (
    req: Request<unknown, unknown, { name: string; status_id: string }>,
    res: Response,
  ): Promise<void> => {
    const { name, status_id } = req.body;
    await this.service.createOne({ name, status_id });
    res.status(201).json({ status: "ok", message: "Organization created successfully" });
  }
}
