<script setup lang="ts">
// @ts-nocheck
import useIndex from "./composables/useIndex";
import AvatarIcon from "@/core/icons/AvatarIcon.vue"

const {
  errors,
  data,
  router,

  deleteRow,
  setSearch,
  setSort,
  avatarURLPath 
} = useIndex()

</script>

<template>
  <div>
    <AppPageHeader> Usuarios </AppPageHeader>

    <div class="flex space-x-2">
      <AppLink class="btn btn-primary" to="/users/create">
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
                Avatar
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('name')">Nombre</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('email')">Correo</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('role')">Role</AppLink>
              </th>
              <th class="">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data.rows" :key="row.id" class="">
              <td>
              <div class="inline-flex items-center space-x-2">
            <img
              v-if="row.avatar"
              :src="avatarURLPath(row.avatar)"
              class="w-10 h-10 rounded-full"
              alt=""
            />
            <AvatarIcon class="w-10 h-10 text-gray-400 rounded-full" v-else />            
          </div>
              </td>
              <td class="">
                <AppLink
                  class="text-indigo-600 hover:text-indigo-800 underline"
                  :to="{ name: 'userEdit', params: { id: row.id }}"                  
                >
                  {{ row.name }}
                </AppLink>
              </td>
              <td class="">
                {{ row.email }}
              </td>
              <td class="">
                {{ row.role_id }}
              </td>
              <td class="">
                <div class="flex items-center space-x-1">                
                  <AppButton
                    class="btn btn-primary btn-xs"                    
                    @click="router.push({ path: '/users/edit/'+row.id })"
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
              <td class="" colspan="4">Usuarios no encontrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
      <AppPaginationView v-if="data.links" :links="data.links" />      
    </div>
  </div>
</template>
