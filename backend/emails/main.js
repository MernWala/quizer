import fs from 'fs/promises';
import path from 'path';

const EMAILS_DIR = new URL('.', import.meta.url);

async function loadEmailTemplates() {
    const emailTemplates = {};
    const files = await fs.readdir(EMAILS_DIR);

    for (const file of files) {
        if (file.endsWith('.js') && file !== 'main.js' && file !== "util.js") {
            const fileNameWithoutExt = path.basename(file, '.js');
            const module = await import(`./${file}`);
            emailTemplates[fileNameWithoutExt] = module.default || module;
        }
    }

    return emailTemplates;
}

const emailTemplates = await loadEmailTemplates();

export default emailTemplates;
