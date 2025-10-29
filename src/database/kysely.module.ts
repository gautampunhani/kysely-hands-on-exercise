
import { Global, Module } from '@nestjs/common';
import { kyselyProviders } from './kysely.providers';

@Global()
@Module({
  providers: [...kyselyProviders],
  exports: [...kyselyProviders],
})
export class KyselyModule {}
