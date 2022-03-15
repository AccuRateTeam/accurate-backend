import {Module} from '@nestjs/common';
import {AuthzModule} from './authz/authz.module';
import {UserModule} from './user/user.module';
import {EventModule} from './event/event.module';
import { TestModule } from './test/test.module';

@Module({
    imports: [
        AuthzModule,
        UserModule,
        EventModule,
        TestModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
