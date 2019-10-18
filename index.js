const express = require('express');

const server = express();

server.use(express.json());

const projects = []; //vai sofrer alterações mas é array, usa CONST

let requestCount = 0; //vai sofrer alterações, usa LET

function checkProjectExists(req, res, next) { 
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  // diferente do exercício do curso, aqui a busca é pelo metódo .find(), e não pelo index da array.

  if(!project){
    return res.status(400).json({error: "No project with that id"});
  };
  return next();
};

function requestTimes (req, res, next) {
  requestCount += 1;
  console.log(`Número de requisições: ${requestCount}`)
  return next();
}

server.use(requestTimes);

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.get('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id)
  // diferente do exercício do curso, aqui a busca é pelo metódo .find(), e não pelo index da array.

  return res.json(project);
})


server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project)
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
    // diferente do exercício do curso, aqui a busca é pelo metódo .find(), e não pelo index da array.
    // o find() retorn o primeiro elemento da array que satisfaça a função teste - testing function


  project.title = title;
  
  return res.json(projects);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  //findIndex() retorna o primeiro elemento da array que satisfaça a condição do teste - testing function

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title)
  return res.json(projects);
});

server.listen(3000);

