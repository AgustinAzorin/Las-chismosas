import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express, { Express, Request, Response } from 'express';
import { join } from 'path';
import 'hbs';
import { AppModule } from '../src/app.module';

let cachedServer: Express | null = null;

async function bootstrap(): Promise<Express> {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  // On Vercel the bundled function runs from /var/task, where includeFiles
  // (see vercel.json) drops views/ and public/ alongside the entry. Locally
  // (node dist/main.js) the cwd is the repo root and the same paths still
  // resolve, so one base works in both worlds.
  const root = process.cwd();
  app.useStaticAssets(join(root, 'public'), { dotfiles: 'allow' });
  app.setBaseViewsDir(join(root, 'views'));
  app.setViewEngine('hbs');

  await app.init();
  return server;
}

export default async function handler(req: Request, res: Response) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
}
