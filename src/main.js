var bb = require('backbone');
var $ = require('jquery');
bb.$ = $;
var Mn = require('marionette');

var Backgrid = require('backgrid');

var Employees = bb.Collection.extend({
    url: 'http://localhost:5000/employees',
    parse: function(response) {
        return response.employees;
    }
});


var columns = [{
    name: 'name',
    label: 'Name',
    cell: 'string'
},{
    name: 'bio',
    label: 'Biography',
    cell: 'string'
}

];




var App = new Mn.Application();

App.on('start', function() {
    var employees = new Employees();
    employees.fetch({
        success: function() {
            var grid = new Backgrid.Grid({
              columns: columns,
              collection: employees
            });
            $('#content').append(grid.render().el);
        }
    });
});

App.start();
