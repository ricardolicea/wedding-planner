import { Body, Controller, Post } from '@nestjs/common';
import { SupabaseAdminService } from '../supabase/supabase-admin.service';

@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly supabaseAdmin: SupabaseAdminService) {}

  @Post()
  async createUser(
    @Body() body: { email: string; password: string; fullName?: string; weddingId?: string; role?: string },
  ) {
    const admin = this.supabaseAdmin.getClient();

    const { data, error } = await admin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
      user_metadata: {
        full_name: body.fullName,
      },
    });

    if (error) {
      console.error(error);
      throw error;
    }
    const userId = data.user?.id;
    const { error: relError } = await admin
      .from('wedding_members')
      .insert({
        wedding_id: body.weddingId,
        user_id: userId,
        role: body.role ?? 'member',
      });

    if (relError) {
      console.error('Error creando relación wedding_members', relError);
      throw relError;
    }

    return data.user;
  }
}
