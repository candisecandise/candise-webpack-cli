#!/usr/bin/env node
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import ora from 'ora';
const spinner = ora('downloading template...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyDirRecursive = (src, dest, answers) => {
    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });
    for(const entry of entries){
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if(entry.isDirectory()){
            copyDirRecursive(srcPath, destPath, answers);
        }else{
            if(entry.name === 'package.json'){
                const { projectName, description = projectName, author } = answers;
                const content = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
                content.name = projectName ;
                content.description = description;
                content.author = author;
                const result = JSON.stringify(content, null, 2);
                fs.writeFileSync(destPath, result);
            }else{
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

}

inquirer.prompt([
    {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: 'my-project'
    },
    {
        type: 'list',
        name: 'projectFrame',
        message: 'Project frame',
        choices: ['babel', 'vue', 'vue3']
    },
    {
        type: 'input',
        name: 'description',
        message: 'Project description',
    },
    {
        type: 'input',
        name: 'author',
        message: 'Project author',
    },
  
]).then((answers) => { 
    const { projectName = 'my-project', projectFrame } = answers;
    const templateDir = path.join(__dirname, `templates/${projectFrame}`);
    const outDir = path.join(process.cwd(), projectName) ;    
    spinner.start();
    try{
        copyDirRecursive(templateDir, outDir, answers);
        spinner.succeed();
    }catch(e){
        spinner.fail();
    }
})