import express from 'express';
import fs from 'fs'

const app = express();
const PORT = 4000;


const getEmailDirs = () => {
    try {
        return fs.readdirSync('./emails');
    } catch (error) {
        throw new Error("Getting error while loading files")
    }
};


const loadEmailModules = async () => {
    try {
        const emailFiles = getEmailDirs();
        const modules = await Promise.all(
            emailFiles.filter((file) => file.endsWith('.js') && !file.startsWith("util")).map(async (file) => {
                const modulePath = `./emails/${file}`;
                const module = await import(modulePath);
                return { file, module };
            })
        );

        let arr = []
        modules.forEach(({ file, module }) => {
            arr.push({
                name: file.replace(".js", ""),
                fun: module.default
            })
        });

        return arr;
    } catch (error) {
        console.error('Error loading email modules:', error);
        throw error;
    }
};


// dynamic routing
loadEmailModules().then(arr => {
    arr.map(({ name, fun }) => {
        if (fun) {
            app.get(`/${name}`, (req, res) => {
                return res.send(fun())
            })
        }
    })
});


// Default routes
app.get('/', async (req, res) => {
    const arr = await loadEmailModules().then(arr => arr)
    const links = arr.map(a => {
        if (a?.fun)
            return { name: `${a?.name}.html`, link: `http://localhost:${PORT}/${a?.name}` }
        return { name: `${a?.name}.html`, error: "Incompleted function!" }
    })

    return res.json({ "Email Templates": links });
});


app.listen(PORT, () => {
    console.log(`Email Preview running at PORT: ${PORT}`);
});