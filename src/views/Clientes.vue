<template>
  <v-container
    fluid
    class="ma-0 pa-0"
  >
    <v-app-bar
      dense
      relative
      max-height="76"
      class="mb-3"
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
              Deseja realmente excluir o cliente {{ selected.nome}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click.stop="dialogExcluir = false">
                Cancelar
              </v-btn>

              <v-btn
                color="red darken-1"
                :disabled="false"
                @click.stop="apagarClientes"
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
              color="#F8D94A"
              height="50px"
            >
              <h2 class="ma-2">
                Cadastro de Clientes
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
                    md="6"
                  >
                    <v-text-field
                      label="Nome:"
                      name="nome"
                      filled
                      autofocus
                      type="text"
                      dense
                      v-model="dado.nome"
                      placeholder="Informe o Nome do Cliente..."
                      :error-messages="nomeErro"
                      :success="!$v.dado.nome.$invalid"
                      @keyup="dado.nome = dado.nome.toUpperCase()"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="3"
                  >
                    <v-text-field
                      label="CPF:"
                      filled
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      dense
                      v-model="dado.cpf"
                      placeholder="Informe o CPF do Cliente..."
                      :error-messages="cpfErro"
                      :success="!$v.dado.cpf.$invalid"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="3"
                  >
                    <v-text-field
                      label="Data Nasc:"
                      filled
                      type="date"
                      v-model="dado.dataNasc"
                      placeholder="Data de Nascimento"
                      :error-messages="dataNascErro"
                      :success="!$v.dado.dataNasc.$invalid"
                    >

                    </v-text-field>
                  </v-col>

                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      label="Endereço:"
                      filled
                      type="text"
                      dense
                      v-model="dado.endereco"
                      placeholder="Informe o Endereço do Cliente..."
                      :error-messages="enderecoErro"
                      :success="!$v.dado.endereco.$invalid"
                      @keyup="dado.endereco = dado.endereco.toUpperCase()"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="3"
                  >
                    <v-text-field
                      label="Bairro:"
                      filled
                      type="text"
                      dense
                      v-model="dado.bairro"
                      placeholder="Informe o Bairro do Cliente..."
                      @keyup="dado.bairro = dado.bairro.toUpperCase()"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="3"
                  >
                    <v-text-field
                      label="Cidade:"
                      filled
                      type="text"
                      dense
                      v-model="dado.cidade"
                      placeholder="Informe o Cidade do Cliente..."
                      :error-messages="cidadeErro"
                      :success="!$v.dado.cidade.$invalid"
                      @keyup="dado.cidade = dado.cidade.toUpperCase()"
                    >

                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                      label="Contato:"
                      filled
                      type="text"
                      dense
                      v-mask="['(##) ####.####']"
                      v-model="dado.telfix"
                      placeholder="Informe o Telefone do Cliente..."
                    >

                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                      label="Celular:"
                      filled
                      type="text"
                      dense
                      v-model="dado.celular"
                      v-mask="['(##) #####.####']"
                      placeholder="Informe o Celular do Cliente..."
                    >

                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                      label="Email:"
                      filled
                      type="text"
                      dense
                      v-model="dado.email"
                      placeholder="Informe o Email do Cliente..."
                      :error-messages="emailErro"
                      :success="!$v.dado.email.$invalid"
                      @keyup="dado.email = dado.email.toLowerCase()"
                    >

                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
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
import { email, minLength, required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
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
        situacao: 'A',
        id: 0,
        nome: '',

        cpf: '',
        dataNasc: '',
        endereco: '',
        cidade: '',
        email: ''
      },
      headers: [

        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'nome',
        },
        { text: 'Cidade', value: 'cidade' },
        { text: 'Endereço', value: 'endereco' },
        { text: 'Telefone', value: 'telfix' },
        { text: 'Celular', value: 'celular' },
        { text: 'Email', value: 'email' },
      ],
      options: [
        { value: 'A', text: 'Ativo' },
        { value: 'D', text: 'Desativado' }

      ]
    }
  ),

  validations: {
    dado: {
      nome: { required, minLength: minLength(3) },
      cpf: { required, minLength: minLength(8) },
      dataNasc: { required },
      endereco: { required, minLength: minLength(3) },
      cidade: { required, minLength: minLength(3) },
      email: { email, required }
    }
  },
  computed: {


    ...mapState(['titulo']),


    nomeErro () {
      const errors = []
      if (!this.$v.dado.nome.$dirty) return errors
      !this.$v.dado.nome.minLength && errors.push('Digite pelo menos 3 letras do nome')
      !this.$v.dado.nome.required && errors.push('Nome é Obrigatório')
      return errors
    },
    cpfErro () {
      const errors = []
      if (!this.$v.dado.cpf.$dirty) return errors
      !this.$v.dado.cpf.minLength && errors.push('Digite pelo menos 8 Números do cpf')
      !this.$v.dado.cpf.required && errors.push('cpf é Obrigatório')
      return errors
    },
    dataNascErro () {
      const errors = []
      if (!this.$v.dado.dataNasc.$dirty) return errors

      !this.$v.dado.dataNasc.required && errors.push('Data Nascimentop é Obrigatório')
      return errors
    },
    enderecoErro () {
      const errors = []
      if (!this.$v.dado.endereco.$dirty) return errors
      !this.$v.dado.endereco.minLength && errors.push('Digite pelo menos 3 letras do endereco')
      !this.$v.dado.endereco.required && errors.push('endereco é Obrigatório')
      return errors
    },
    cidadeErro () {
      const errors = []
      if (!this.$v.dado.cidade.$dirty) return errors
      !this.$v.dado.cidade.minLength && errors.push('Digite pelo menos 3 letras cidade')
      !this.$v.dado.cidade.required && errors.push('cidade é Obrigatório')
      return errors
    },
    emailErro () {
      const errors = []
      if (!this.$v.dado.email.$dirty) return errors
      !this.$v.dado.email.email && errors.push('O email é inválido')
      !this.$v.dado.email.required && errors.push('email é Obrigatório')
      return errors
    },
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
        nome: '',
        cpf: '',
        dataNasc: '',
        endereco: '',
        cidade: '',
        email: ''
      },
        this.CarregaDados()
    },

    Fechar () {
      this.reset()
      this.dialog = false
    },
    apagarClientes () {

      this.menshow = false //mudo pra false pois ele não aparece depois


      var adaRef = firebase.database().ref('/pessoas/' + this.selected.id);
      adaRef.remove().then(() => {
        this.menshow = true
        this.mensagem = 'Cliente excluido com sucesso'
        this.dialogExcluir = false
        this.reset()


      })
    },

    Salvar () {
      this.menshow = false //mudo pra false pois ele não aparece depois
      if (!this.$v.$invalid) {
        firebase.database().ref('pessoas').limitToLast(1).once('value')
          .then(res => {
            let result = Object.values(res.val() == null ? [] : res.val())

            if (this.dado.id == 0) {
              this.dado.id = res.val() == null ? 1 : result[0].id + 1
            }

            let updates = {}
            updates['/pessoas/' + this.dado.id] = this.dado
            let pessoas_ref = firebase.database().ref()

            pessoas_ref.update(updates)
              .then(() => {
                this.menshow = true
                this.mensagem = 'Atualizado com sucesso'
                this.dialog = false
                this.reset()

              })

          })
          .catch((e) => { console.log(e) })
      }
      // 

    },
    CarregaDado (e, itens) {

      this.dado = { ...itens.item }
      this.dialog = true
    },

    CarregaDados () {



      let pessoas_ref = firebase.database().ref('pessoas')
      pessoas_ref.once('value')
        .then(res => {

          let cursor_dados = Object.values(res.val() == null ? [] : res.val())

          this.dados = cursor_dados.reverse()


        })
        .catch((e) => { console.error(e.message) })
    }
  },
  mounted () {
    this.CarregaDados()
    this.$store.state.titulo = "Cadastro de Clientes"

  },
  created () {
    this.$store.state.titulo = "Cadastro de Clientes"
  },
}
</script>

