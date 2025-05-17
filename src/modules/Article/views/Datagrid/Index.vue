<script setup lang="ts">
// @ts-nocheck
import useIndex from "./composables/useIndex";

const {
  errors,
  data,
  router,

  deleteRow,
  setSearch,
  setSort  
} = useIndex()
</script>

<template>
<div>
  <AppPageHeader> Artículos </AppPageHeader>

  <div class="flex space-x-2">
    <AppLink class="btn btn-primary" to="/articles/create">
      <span>Crear</span>
    </AppLink>
  </div>
    
  <div class="overflow-hidden panel mt-6">      
    <div class="mb-6 flex justify-between items-center">
      <div class="flex items-center">
        <div class="flex w-full bg-white shadow rounded">
          <input
            class=""
            type="text"
            v-model="data.search"
            @input="setSearch"
            placeholder="Filtrar…"
          />
        </div>
      </div>
    </div>      
    <div class="table-data__wrapper">
      <table class="table-data">
        <thead>
          <tr class="">
              <th class="">
                <AppLink to="#" @click.prevent="setSort('int_cod')">Código interno</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('name')">Nombre</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('description')">Descripción</AppLink>
              </th>            
              <th class="">
                <AppLink to="#" @click.prevent="setSort('status')">Estatus</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('photo')">Foto</AppLink>
              </th>                                     
            <th class="">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.rows" :key="row.id" class="">
            <td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ name: 'articleEdit', params: { id: row.id }}"
              >
                {{ row.int_cod }}
              </AppLink>
            </td>
            <td class="">
              {{ row.name }}
            </td>
            <td class="">
              {{ row.description }}
            </td>
            <td class="">
              {{ row.status ? 'Activo' : 'Inactivo' }}
            </td>
            <td class="">
              {{ row.photo }}
            </td>
            <td class="">
              <div class="flex items-center space-x-1">                
                <AppButton
                  class="btn btn-primary btn-xs"                    
                  @click="router.push({ path: '/articles/edit/'+row.id })"
                >
                  Editar
                </AppButton>
                <AppButton
                  @click="deleteRow(row.id)"                    
                  class="btn btn-danger btn-xs"                    
                >
                  Eliminar
                </AppButton>
              </div>
            </td>
          </tr>
          <tr v-if="data.rows.length === 0">
            <td class="" colspan="4">Articles not found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
    <AppPaginationView v-if="data.links" :links="data.links" />      
  </div>
</div>
</template>
