import { gql } from "graphql-tag"

export const SELECT_TODOS = gql`
    query todos(
        $where: todos_bool_exp!
        $order_by: [todos_order_by!]
        $limit: Int = 10
        $offset: Int
    ) {
        todos(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`
export const INSERT_TODOS_ONE = gql`
    mutation insert_todos_one($object: todos_insert_input!) {
        insert_todos_one(object: $object) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`

export const UPDATE_TODO_BY_PK = gql`
    mutation update_todos_by_pk($pk_columns: todos_pk_columns_input!, $_set: todos_set_input!) {
        update_todos_by_pk(pk_columns: $pk_columns, _set: $_set) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`

export const DELETE_TODOS_BY_PK = gql`
    mutation delete_todos_by_pk($id: Int!) {
        delete_todos_by_pk(id: $id) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`
