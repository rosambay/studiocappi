<template>
  <div class="tab-pedidos">
        <div>
            <b-button variant="primary" @click="$bvModal.show('Pedidos')" ref="btnShow" class="mr-2">
                        <i class="fa fa-plus"></i>
                    </b-button>
            <!-- <b-button :disabled="botExcluir" variant="danger" @click="$bvModal.show('excluirServico')" ref="btnDel" class="mr-2">
                        <i class="fa fa-trash"></i>
                    </b-button> -->
        </div>
        <b-modal size="xl" id="Pedidos"  hide-footer title="Cadastro de Pedidos">
            <b-form @submit.stop.prevent="onSubmit">
                <input id="pedido-id" type="hidden" v-model="dado.id" />
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Tipo de Serviço:" label-for="servico">
                            <b-form-input id="servico" v-uppercase autofocus
                                type="text"
                                name="servico"
                                v-model="dado.servico" 
                                v-validate="{ required: true, min:3 }"
                                placeholder="Informe o Tipo de Servico" 
                                :state="validateState('servico')"
                                aria-describedby="erro-servico"/>
                                <b-form-invalid-feedback
                                    id="erro-servico">
                                    Serviço inválido</b-form-invalid-feedback>
                                
                        </b-form-group>
                    </b-col>
                    <b-col md="3" sm="12">
                        <b-form-group label="Valor:" label-for="valor">
                     
                            <currency-input  ref="valor" currency='BRL' locale="pt" id="valor" class="direita" 
                                v-model="dado.valor"  
                                v-validate="{ required: true, min:0.01}"
                              
                                placeholder="Informe o valor do Serviço" 
                                name="valor"
                                :state="validateState('valor')"
                                aria-describedby="erro-valor"
                                data-vv-name="valor"/>
                                <b-form-invalid-feedback
                                    id="erro-valor">
                                    valor Inválido!
                                </b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                <b-col xs="12">
                    <b-button type="submit" variant="primary">Salvar</b-button>

                   
                    <b-button class="ml-2" @click="closeCadastro">Cancelar</b-button>
                </b-col>
            </b-row>
            </b-form>
        </b-modal>
  </div>

</template>

<script>

// import firebase from "firebase"

export default {
    name: 'Pedidos',
     data: function(){
        return {
            Clientes:[]
        }
     }

}
</script>

<style>

</style>