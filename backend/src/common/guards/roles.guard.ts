import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private prisma: PrismaService
  ) {}

async canActivate(context: ExecutionContext): Promise<boolean> {

  const requiredRoles =
    this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

  if (!requiredRoles) return true

  const request = context.switchToHttp().getRequest()
  const user = request.user

  const userRoles = await this.prisma.userRole.findMany({
    where: { user_id: user.userId },
    include: { role: true }
  })

  const roles = userRoles.map(r => ({
    name: r.role.name,
    scope: r.role.scope
  }))

  // PLATFORM role bypass
  const isSuperAdmin = roles.some(
    r => r.name === 'super_admin' && r.scope === 'PLATFORM'
  )

  if (isSuperAdmin) return true

  const allowed = requiredRoles.some(role =>
    roles.some(r => r.name === role)
  )

  if (!allowed) {
    throw new ForbiddenException('Insufficient permissions')
  }

  return true
}
}