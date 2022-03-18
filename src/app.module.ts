import {Module} from '@nestjs/common';
import {AuthzModule} from './authz/authz.module';
import {UserModule} from './user/user.module';
import {EventModule} from './event/event.module';
import { ParcourModule } from './parcour/parcour.module';
import {EventEmitterModule} from "@nestjs/event-emitter";

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        AuthzModule,
        UserModule,
        EventModule,
        ParcourModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
