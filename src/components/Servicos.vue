<template>
  <div class="tab-serv">
    <div>
      <b-button
        variant="primary"
        @click="$bvModal.show('cadastroServico')"
        ref="btnShow"
        class="mr-2"
      >
        <i class="fa fa-plus"></i>
      </b-button>
      <b-button
        :disabled="botExcluir"
        variant="danger"
        @click="$bvModal.show('excluirServico')"
        ref="btnDel"
        class="mr-2"
      >
        <i class="fa fa-trash"></i>
      </b-button>
    </div>
    <div>
      <b-table
        selectable
        select-mode="single"
        @row-selected="onRowSelected"
        class="gridServ"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @row-dblclicked="CarregaDadoServico"
        outlined
        hover
        striped
        sticky-header="500px"
        responsive
        :items="dados"
        :fields="fields"
      >
        <!-- <template v-slot:cell(valor)="data">
                    <b>{{ data.value.toString() | v-mask="mask" }}</b>
                </template> -->
      </b-table>
    </div>
    <b-modal
      size="sm"
      id="excluirServico"
      hide-footer
      title="Deseja realmente apagar esse Servico?"
    >
      <b-row>
        <b-col xs="12">
          <b-button
            variant="danger"
            @click="apagarServicos"
          >Apagar</b-button>

          <b-button
            class="ml-2"
            @click="closeExcluir"
          >Cancelar</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      size="xl"
      id="cadastroServico"
      hide-footer
      title="Cadastro de Serviços"
    >
      <b-form @submit.stop.prevent="onSubmit">
        <input
          id="serv-id"
          type="hidden"
          v-model="dado.id"
        />
        <b-row>
          <b-col
            md="6"
            sm="12"
          >
            <b-form-group
              label="Tipo de Serviço:"
              label-for="servivo"
            >
              <b-form-input
                id="servico"
                v-uppercase
                autofocus
                type="text"
                name="servico"
                v-model="dado.servico"
                v-validate="{ required: true, min:3 }"
                placeholder="Informe o Tipo de Servico"
                :state="validateState('servico')"
                aria-describedby="erro-servico"
              />
              <b-form-invalid-feedback id="erro-servico">
                Serviço inválido</b-form-invalid-feedback>

            </b-form-group>
          </b-col>
          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              label="Valor:"
              label-for="valor"
            >

              <currency-input
                ref="valor"
                currency='BRL'
                locale="pt"
                id="valor"
                class="direita"
                v-model="dado.valor"
                v-validate="{ required: true, min:0.01}"
                placeholder="Informe o valor do Serviço"
                name="valor"
                :state="validateState('valor')"
                aria-describedby="erro-valor"
                data-vv-name="valor"
              />
              <b-form-invalid-feedback id="erro-valor">
                valor Inválido!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col xs="12">
            <b-button
              type="submit"
              variant="primary"
            >Salvar</b-button>

            <b-button
              class="ml-2"
              @click="closeCadastro"
            >Cancelar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

  </div>

</template>

<script>

import firebase from "firebase"

export default {
  name: "ServicosTab",

  data: function () {
    return {

      sortBy: 'id',
      sortDesc: true,
      selected: [],
      dado: {},
      valor: null,

      botExcluir: true,
      dados: [],
      limit: 200,
      start: '1',
      count: 0,
      page: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true, class: 'id', headerTitle: 'ID do Serviço' },
        { key: 'servico', label: 'Tipo de Serviço', sortable: true, class: 'servico', headerTitle: 'Tipo de Serviço' },
        {
          key: 'valor', label: 'Valor', sortable: true, formatter: (value, key, item) => {
            return Number(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL', currencyDisplay: 'symbol' })
          }
        },


      ],
      options: [
        { value: 'A', text: 'Ativo' },
        { value: 'D', text: 'Desativado' }

      ],

      currency: {

        locale: 'pt',
        currency: 'BRL',
        valueAsInteger: false,
        distractionFree: true,
        precision: 2,
        autoDecimalMode: true,
        valueRange: { min: 0 },
        allowNegative: false
      }


    }
  },

  methods: {
    closeExcluir () {
      this.reset()
      this.$root.$emit('bv::hide::modal', 'excluirServico', '#btnDel')
    },
    closeCadastro () {
      this.reset()
      this.$root.$emit('bv::hide::modal', 'cadastroServico', '#btnShow')
    },
    CarregaDadoServico (itens) {
      this.dado = { ...itens }

      this.$root.$emit('bv::show::modal', 'cadastroServico', '#btnShow')
    },
    apagarServicos () {

      var adaRef = firebase.database().ref('/servicos/' + this.selected[0].id);
      adaRef.remove().then(() => {
        this.closeExcluir()
        this.$bvToast.toast('Servico Apagado com sucesso!', {
          title: 'Atenção',
          variant: 'danger',
          toaster: 'b-toaster-top-center',
          autoHideDelay: 500
        })
      })
    },
    onSubmit () {


      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        firebase.database().ref('servicos').limitToLast(1).once('value')
          .then(res => {
            if (res.val()) {
              let result = Object.values(res.val())

              if (!this.dado.id) {
                this.dado.id = result[0].id + 1
              }
            }
            else {
              this.dado.id = 1;
            }
            //    this.dado.valor = this.valor

            // this.dado.id = res.val()==null ? 1 :result[0].id + 1
            let updates = {}
            updates['/servicos/' + this.dado.id] = this.dado
            let pessoas_ref = firebase.database().ref()

            pessoas_ref.update(updates)
              .then(() => {
                this.closeCadastro()
                this.$bvToast.toast('Salvo com sucesso!', {
                  title: 'Atenção',
                  variant: 'success',
                  toaster: 'b-toaster-top-center',
                  autoHideDelay: 500
                })
              })

          })
          .catch((e) => { console.log(e) })


      })

    },
    reset () {

      this.dado = {}
      this.valor = null
      this.CarregaDados()
      this.$nextTick(() => {
        this.$validator.reset();
      });

    },


    onRowSelected (items) {

      this.selected = items
      this.botExcluir = this.selected.length == 0 ? true : false

    },
    CarregaDados () {
      let pessoas_ref = firebase.database().ref('servicos')
      pessoas_ref.once('value')
        .then(res => {

          let cursor_dados = res.val() == undefined ? null : Object.values(res.val())
          this.dados = cursor_dados
        })
        .catch((e) => { console.log(e) })
    },
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
  },
  mounted () {
    this.CarregaDados()
  },
}
</script>

<style>
.direita {
  text-align: right;
}
.servico {
  width: 70%;
}
</style>