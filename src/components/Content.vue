<template>
  <div class="content">

        <b-tabs class="tab" >
            <b-tab class="teste" title="Clientes" active><Clientes /></b-tab>
            <b-tab title="Serviços"><Servicos /></b-tab>
            <b-tab title="Pedidos/Orçamentos" ><Pedidos /></b-tab>
            <b-tab title="Ordens de Serviço" ><p>I'm a disabled tab!</p></b-tab>
            <b-tab title="Relatórios" ><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>     
  </div>
</template>

<script>
 import Clientes from '@/components/Clientes'
 import Servicos from '@/components/Servicos'
  import Pedidos from '@/components/Pedidos'

export default {
    name: 'Content',
    components: { Clientes , Servicos , Pedidos}
}
</script>

<style>
    .content{
        grid-area: content;
        background-color: #efefef;
        padding: 0;
        margin: 0 !important;
        height: 100%;               
    }
    .teste{
        margin: 0 !important;
        height: (100vh - 100px);   
    }
    .tab{
        margin-top: 0;
    }
    
    
</style>