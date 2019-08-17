import Model from './Model';
import View from './View';
import Controller from './Controller';

let root = document.getElementById('app')

let app = new Controller(new Model(), new View(root))


