import type { OrganizationService } from "./organization.service.js";
import type { Request, Response } from "express";

export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  findById = async (req: Request, res: Response): Promise<void> => {

    const organizationId = req.params.id as string;

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
}
