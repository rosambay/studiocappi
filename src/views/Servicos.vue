<template>
  <v-container
    fluid
    class="ma-0 pa-0"
  >
    <v-app-bar
      dense
      relative
      max-height="76"
      class="mb-3 child-flex"
      color="grey lighten-5"
      prominent
    >

      <v-btn
        class="ma-1"
        fab
        :elevation=15
        color="#F8D94A"
        @click.stop="dialog = true"
      >
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
      <v-btn
        class="ma-1"
        fab
        :elevation=15
        @click.stop="dialogExcluir = true"
        :disabled="botExcluir"
        color="red lighten-2"
      >
        <v-icon>mdi-account-minus-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        fab
        :elevation=15
      >
        <v-icon>mdi-magnify-plus-outline</v-icon>
      </v-btn>

    </v-app-bar>
    <v-sheet
      id="scrolling-techniques"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-card
        class="mp-0 mx-auto"
        id="scrolling-techniques"
      >

        <v-data-table
          :headers="headers"
          :items="dados"
          fluid
          single-select
          show-select
          hide-default-footer
          @item-selected="rowSelected"
          @dblclick:row="CarregaDado"
        >

        </v-data-table>
        <v-dialog
          v-model="dialogExcluir"
          max-width="290"
          persistent
        >
          <v-card>
            <v-card-title class="headline">Atenção</v-card-title>

            <v-card-text>
              Deseja realmente excluir o Servico {{ selected.nome}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click.stop="dialogExcluir = false">
                Cancelar
              </v-btn>

              <v-btn
                color="red darken-1"
                :disabled="false"
                @click.stop="apagarServico"
              >
                Excluir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog"
          max-width="80%"
          persistent
          scrollable
        >
          <v-card>
            <v-system-bar
              color="indigo darken-1"
              dark
              height="50px"
            >
              <h2 class="ma-2">
                Cadastro de Serviços
              </h2>
              <v-spacer></v-spacer>

              <v-icon @click="Fechar">
                mdi-close
              </v-icon>
            </v-system-bar>

            <v-card-text>
              <v-form>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="5"
                  >
                    <v-text-field
                      label="Serviço:"
                      name="servico"
                      filled
                      autofocus
                      type="text"
                      dense
                      v-model="dado.servico"
                      placeholder="Informe o tipo de Serviço..."
                      :error-messages="servicoErro"
                      :success="!$v.dado.servico.$invalid"
                      @keyup="dado.servico = dado.servico.toUpperCase()"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="3"
                  >
                    <vuetify-money
                      label="Valor:"
                      filled
                      dense
                      :hideDetails="true"
                      v-model="dado.valor"
                      :options="config"
                      :valueWhenIsEmpty="valueWhenIsEmpty"
                      placeholder="Informe o valor do serviço..."
                      :error="$v.dado.valor.$invalid"
                    >

                    </vuetify-money>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  >
                    <v-select
                      :items="options"
                      v-model="dado.situacao"
                      label="Situação"
                    ></v-select>
                  </v-col>

                </v-row>
              </v-form>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click="Fechar">
                Cancelar
              </v-btn>

              <v-btn
                color="green darken-1"
                :disabled="$v.$invalid"
                @click="Salvar"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
        <v-snackbar
          :timeout="1000"
          :value="menshow"
          absolute
          center
          shaped
          botton
        >
          {{mensagem}}
        </v-snackbar>

      </v-card>
    </v-sheet>
  </v-container>

</template>
<script>
import firebase from "firebase"
import { validationMixin } from 'vuelidate'
import { mapState } from 'vuex'
import { minLength, required } from 'vuelidate/lib/validators'
const maiorquezero = (value) => value > 0

export default {

  mixins: [validationMixin],

  data: () => (
    {
      dados: [],
      botExcluir: true,
      dialog: false,
      dialogExcluir: false,
      menshow: false,
      selected: [],
      mensagem: '',
      dado: {
        id: 0,
        situacao: 'A',
        servico: '',
        valor: 0
      },
      valueWhenIsEmpty: "",
      config: {
        locale: "pt-BR",
        prefix: "R$",
        suffix: "",
        length: 11,
        precision: 2
      },
      headers: [

        {
          text: 'Serviço',
          align: 'start',
          sortable: true,
          value: 'servico',
        },
        { text: 'Valor', value: 'valor' },
      ],
      options: [
        { value: 'A', text: 'Ativo' },
        { value: 'D', text: 'Desativado' }

      ]
    }
  ),

  validations: {
    dado: {
      servico: { required, minLength: minLength(3) },
      valor: { required, maiorquezero }
    }
  },
  computed: {
    ...mapState(['titulo']),
    servicoErro () {
      const errors = []
      if (!this.$v.dado.servico.$dirty) return errors
      !this.$v.dado.servico.minLength && errors.push('Digite pelo menos 3 letras do servico')
      !this.$v.dado.servico.required && errors.push('Nome é Obrigatório')
      return errors
    },
    valorErro () {
      const errors = false
      if (this.$v.dado.valor == 0) return true
      return errors
    }
  },
  methods: {

    rowSelected (items) {
      this.selected = items.item
      this.botExcluir = !items.value
    },

    reset () {
      this.$v.$reset()
      this.dado = {
        situacao: 'A',
        id: 0,
        servico: '',
        valor: 0

      },
        this.CarregaDados()
    },

    Fechar () {
      this.reset()
      this.dialog = false
    },
    apagarServico () {

      this.menshow = false //mudo pra false pois ele não aparece depois


      var adaRef = firebase.database().ref('/servicos/' + this.selected.id);
      adaRef.remove().then(() => {
        this.menshow = true
        this.mensagem = 'Serviço excluido com sucesso'
        this.dialogExcluir = false
        this.reset()


      })
    },

    Salvar () {
      this.menshow = false //mudo pra false pois ele não aparece depois
      if (!this.$v.$invalid) {
        firebase.database().ref('servicos').limitToLast(1).once('value')
          .then(res => {
            let result = Object.values(res.val() == null ? [] : res.val())

            if (this.dado.id == 0) {
              this.dado.id = res.val() == null ? 1 : result[0].id + 1
            }

            let updates = {}
            updates['/servicos/' + this.dado.id] = this.dado
            let pessoas_ref = firebase.database().ref()

            pessoas_ref.update(updates)
              .then(() => {
                this.menshow = true
                this.mensagem = 'Atualizado com sucesso'
                this.dialog = false
                this.reset()

              })

          })
          .catch((e) => { console.error(e) })
      }
      // 

    },
    CarregaDado (e, itens) {

      this.dado = { ...itens.item }
      this.dialog = true
    },

    CarregaDados () {


      let pessoas_ref = firebase.database().ref('servicos')
      pessoas_ref.once('value')
        .then(res => {

          let cursor_dados = Object.values(res.val() == null ? [] : res.val())

          this.dados = cursor_dados.reverse()


        })
        .catch((e) => { console.error(e) })
    }
  },
  mounted () {
    this.CarregaDados()

  }
}
</script>

