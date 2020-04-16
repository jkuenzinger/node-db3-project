const db = require ('../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    update,
    remove,
    add
};


function findById(id) {
    return db('schemes')
    .where({id})
    .first();
}

function findSteps(id) {
    return db('schemes as sc')
    .join('steps as s', 's.scheme_id', 'sc.id')
    .select('s.id', 'sc.scheme_name', 's.step_number', 's.instructions')
    .where({'sc.id': id})
    .orderBy('s.step_number')
}

function add(scheme) {
    return db('schemes').insert(scheme).then(res => {
        if (res) {
            return findById(res[0])
        } else {
            return res.status(500).json({message: ' failed to get schemes'})
        }
    })
}

function remove(id) {
    return db('schemes').where({ id }).del()
}

function update(changes, id) {
    return db('schemes').where({ id }).update(changes)

}

function find() {
    return db('schemes');
}