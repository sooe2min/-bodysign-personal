"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port');
    app.use(cookie_parser_1.default());
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidNonWhitelisted: true,
        disableErrorMessages: configService.get('nodeEnv') === 'prod' ? true : false,
    }));
    app.enableCors(configService.get('corsOptions'));
    await app.listen(port, () => {
        console.log(`Listening to port: ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map