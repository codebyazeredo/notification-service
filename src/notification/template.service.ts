import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  async render(template: string, payload: Record<string, any>) {
    const filePath = path.join( __dirname, 'templates', `${template}.hbs`);
    const source = await fs.readFile(filePath, 'utf-8');
    const compile = Handlebars.compile(source);

    return compile(payload);
  }
}