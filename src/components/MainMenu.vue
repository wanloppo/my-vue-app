<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Villa App
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          aria-label="Logout"
          icon="logout"
        />        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
          
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable target="_blank" rel="noopener" href="https://shop.villamarket.com/">
          <q-item-section avatar>
            <q-icon name="storefront" />
          </q-item-section>
          <q-item-section>
            <q-item-label>ShopVilla</q-item-label>
            <q-item-label caption>https://shop.villamarket.com/</q-item-label>
          </q-item-section>
        </q-item>   
        <q-item clickable target="_blank" rel="noopener" href="https://admin.villa.kitchen/">
          <q-item-section avatar>
            <q-icon name="kitchen" />
          </q-item-section>
          <q-item-section>
            <q-item-label>VillaBackEnd</q-item-label>
            <q-item-label caption>https://admin.villa.kitchen/</q-item-label>
          </q-item-section>
        </q-item>              
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- My Content -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MyLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer
    }
  }
}
</script>