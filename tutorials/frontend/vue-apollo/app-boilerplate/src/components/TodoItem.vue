<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { DELETE_TODOS_BY_PK, UPDATE_TODO_BY_PK } from '../graphql-operations';
const { todos, type } = defineProps(["todos", "type"])

const updateTodo = useMutation(UPDATE_TODO_BY_PK)

const deleteTodoByPk = useMutation(DELETE_TODOS_BY_PK, {
    update: (cache, { data }) => {
        cache.modify({
            fields: {
                todos: (existingTodos, { readField }) => {
                    return existingTodos.filter(
                        (todoRef) => data.delete_todos_by_pk.id !== readField("id", todoRef)
                    )
                },
            },
        })
    },
})
</script>

<template>
    <ul>
        <li v-for="todo in todos" v-bind:key="todo.id">
            <div v-if="todo.is_public" class="userInfoPublic">
                <p>@{{ todo.user.name }}</p>
            </div>
            <div class="view" v-if="type === 'private'">
                <div class="round">
                    <input type="checkbox" :id="todo.id" :checked="todo.is_completed" />
                    <label
                        @click="
                            updateTodo.mutate({
                                pk_columns: { id: todo.id },
                                _set: { is_completed: !todo.is_completed },
                            })
                        "
                        :htmlFor="todo.id"
                    />
                </div>
            </div>
            <div class="labelContent">
                <p :style="todo.is_completed ? 'text-decoration: strikethrough' : ''">
                    {{ todo.title }}
                </p>
            </div>
            <button
                v-if="type === 'private'"
                @click="deleteTodoByPk.mutate({ id: todo.id })"
                class="closeBtn"
            >
            x
            </button>
        </li>
    </ul>
</template>
