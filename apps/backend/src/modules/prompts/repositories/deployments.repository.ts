import { getExecutor } from '@/infrastructure/db/context';
import { deploymentsTable } from '@/modules/prompts/tables/deployments.table';
import { BaseRepository } from '@/shared/core/base.repository';

interface UpsertParams {
  environmentSlug: string;
  projectId: string;
  promptId: string;
  promptVersionId: string;
  workspaceId: string;
}

export class DeploymentsRepository extends BaseRepository<typeof deploymentsTable> {
  constructor(private readonly deployments: typeof deploymentsTable) {
    super(deployments);
  }

  async upsert({ environmentSlug, promptId, promptVersionId, workspaceId }: UpsertParams) {
    const executor = getExecutor();

    return executor
      .insert(this.deployments)
      .values({
        environmentSlug,
        promptId,
        promptVersionId,
        workspaceId,
      })
      .onConflictDoUpdate({
        set: {
          promptVersionId,
        },
        target: [this.deployments.promptId, this.deployments.environmentSlug],
      })
      .returning();
  }
}

export const deploymentsRepository = new DeploymentsRepository(deploymentsTable);
