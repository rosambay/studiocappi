<template>

  <div class="tab-cli ">
    <div>
      <b-button
        variant="primary"
        @click="$bvModal.show('cadastro')"
        ref="btnShow"
        class="mr-2"
      >
        <i class="fa fa-plus"></i>
      </b-button>
      <b-button
        :disabled="botExcluir"
        variant="danger"
        @click="$bvModal.show('excluir')"
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
        class="teste"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @row-dblclicked="CarregaDado"
        outlined
        hover
        striped
        sticky-header="500px"
        responsive
        :items="dados"
        :fields="fields"
      ></b-table>

      <!-- <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" align="left" last-number />  -->

    </div>
    <b-modal
      size="sm"
      id="excluir"
      hide-footer
      title="Deseja realmente apagar esse cliente?"
    >
      <b-row>
        <b-col xs="12">
          <b-button
            variant="danger"
            @click="apagarClientes"
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
      id="cadastro"
      hide-footer
      title="Cadastro de Clientes"
    >
      <b-form @submit.stop.prevent="onSubmit">
        <input
          id="user-id"
          type="hidden"
          v-model="dado.id"
        />
        <b-row>
          <b-col
            md="6"
            sm="12"
          >
            <b-form-group
              label="Nome:"
              label-for="nome"
            >
              <b-form-input
                id="nome"
                v-uppercase
                autofocus
                type="text"
                name="nome"
                v-model="dado.nome"
                v-validate="{ required: true, min:3 }"
                placeholder="Informe o Nome do Cliente..."
                :state="validateState('nome')"
                aria-describedby="input-1-live-feedback"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                Nome Inválido</b-form-invalid-feedback>

            </b-form-group>
          </b-col>
          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              label="CPF:"
              label-for="cpf"
            >
              <b-form-input
                id="cpf"
                type="text"
                v-mask="['###.###.###-##', '##.###.###/####-##']"
                v-model="dado.cpf"
                v-validate="{ required: true, min:12}"
                placeholder="Informe o CPF do Cliente"
                name="cpf"
                :state="validateState('cpf')"
                aria-describedby="erro-cpf"
                data-vv-as="CPF:"
              />
              <b-form-invalid-feedback id="erro-cpf">
                CPF Inválido!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              label="Data Nasc:"
              label-for="dataNasc"
            >
              <b-form-input
                id="dataNasc"
                type="date"
                v-model="dado.dataNasc"
                v-validate="{ required: true }"
                placeholder="Data de Nascimento"
                name="dataNasc"
                :state="validateState('dataNasc')"
                aria-describedby="erro-dataNasc"
              />
              <b-form-invalid-feedback id="erro-dataNasc">
                Data de Nascimento Inválida!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="6"
            sm="12"
          >
            <b-form-group
              label="Endereço:"
              label-for="endereco"
            >
              <b-form-input
                id="endereco"
                type="text"
                v-uppercase
                v-model="dado.endereco"
                v-validate="{ required: true }"
                placeholder="Informe Endereço do Cliente..."
                name="endereco"
                :state="validateState('endereco')"
                aria-describedby="erro-endereco"
              />
              <b-form-invalid-feedback id="erro-endereco">
                Endereco Inválido!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              label="Bairro:"
              label-for="bairro"
            >
              <b-form-input
                id="bairro"
                type="text"
                v-uppercase
                v-model="dado.bairro"
                v-validate="{ required: true }"
                placeholder="Informe o Bairro do Cliente..."
                name="bairro"
                :state="validateState('bairro')"
                aria-describedby="erro-bairro"
              />
              <b-form-invalid-feedback id="erro-bairro">
                Bairro Inválido!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              label="Cidade:"
              label-for="cidade"
            >
              <b-form-input
                id="cidade"
                type="text"
                v-uppercase
                v-model="dado.cidade"
                v-validate="{ required: true }"
                placeholder="Informe a Cidade do Cliente..."
                name="cidade"
                :state="validateState('cidade')"
                aria-describedby="erro-cidade"
              />
              <b-form-invalid-feedback id="erro-cidade">
                Cidade Inválido!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              label="Contato:"
              label-for="telfix"
            >
              <b-form-input
                id="telfix"
                type="tel"
                v-model="dado.telfix"
                v-mask="['(##) ####-####']"
                placeholder="Informe Telefone do Cliente..."
              />
            </b-form-group>
          </b-col>
          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              label="Celular:"
              label-for="celular"
            >
              <b-form-input
                id="celular"
                type="tel"
                v-model="dado.celular"
                v-validate="{ required: true , min:15}"
                v-mask="['(##) #####-####']"
                placeholder="Informe o Celular do Cliente..."
                name="celular"
                :state="validateState('celular')"
                aria-describedby="erro-celular"
              />
              <b-form-invalid-feedback id="erro-celular">
                Celular Inválido!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              label="Email:"
              label-for="email"
            >
              <b-form-input
                id="email"
                type="email"
                v-downcase
                v-model="dado.email"
                v-validate="{ required: true }"
                placeholder="Informe a Email do Cliente..."
                name="email"
                :state="validateState('email')"
                aria-describedby="erro-email"
              />
              <b-form-invalid-feedback id="erro-email">
                Email Inválido!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              label="Situação:"
              label-for="situacao"
            >
              <b-form-select
                id="situacao"
                :options="options"
                v-model="dado.situacao"
                v-validate="{ required: true }"
                placeholder="Informe a situacao do Cliente..."
                name="situacao"
                :state="validateState('situacao')"
                aria-describedby="erro-situacao"
              >
                <!-- <template v-slot:first>
                                <b-form-select-option value="A" ></b-form-select-option>
                            </template> -->
              </b-form-select>
              <b-form-invalid-feedback id="erro-situacao">
                Situação Inválido!
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
  name: 'ClientesTab',
  data: function () {
    return {
      sortBy: 'id',
      sortDesc: true,
      selected: [],
      dado: { situacao: 'A' },
      botExcluir: true,
      dados: [],
      limit: 200,
      start: '1',
      count: 0,
      page: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true, class: 'id', headerTitle: 'Código do Cliente' },
        { key: 'nome', label: 'Nome', sortable: true, class: 'nome', headerTitle: 'Nome do Cliente' },
        //    { key: 'cpf', label: 'CPF', sortable: true, class: 'cpf', headerTitle: 'Número do CPF'},
        //    { key: 'nome', label: 'Nome', sortable: true, class: 'nome', headerTitle: 'Nome do Cliente'},
        //    { key: 'nome', label: 'Nome', sortable: true, class: 'nome', headerTitle: 'Nome do Cliente'},
        //    { key: 'nome', label: 'Nome', sortable: true, class: 'nome', headerTitle: 'Nome do Cliente'},

        { key: 'cidade', label: 'Cidade', sortable: true },
        { key: 'endereco', label: 'Endereço', sortable: true },
        { key: 'telfix', label: 'Telefone', sortable: true },
        { key: 'celular', label: 'Celular', sortable: true },
        { key: 'email', label: 'Email', sortable: true }
      ],
      options: [
        { value: 'A', text: 'Ativo' },
        { value: 'D', text: 'Desativado' }

      ]
    }
  },

  methods: {

    onRowSelected (items) {

      this.selected = items
      this.botExcluir = this.selected.length == 0 ? true : false
      console.log(this.botExcluir)
    },
    closeExcluir () {
      this.reset()
      this.$root.$emit('bv::hide::modal', 'excluir', '#btnDel')
    },
    closeCadastro () {
      this.reset()
      this.$root.$emit('bv::hide::modal', 'cadastro', '#btnShow')
    },
    reset () {

      this.dado = {}
      this.CarregaDados()
      this.$nextTick(() => {
        this.$validator.reset();
      });

    },


    apagarClientes () {
      // console.log(this.selected[0].id)

      // for (var prop in this.selected) {
      //   console.log(this.selected[prop])


      var adaRef = firebase.database().ref('/pessoas/' + this.selected[0].id);
      adaRef.remove().then(() => {
        this.closeExcluir()
        this.$bvToast.toast('Cliente Apagado com sucesso!', {
          title: 'Atenção',
          variant: 'danger',
          toaster: 'b-toaster-top-center',
          autoHideDelay: 500
        })
      })



      // }

      //         pessoas_ref.update(updates)
      //             .then(() => {
      //                 this.reset()
      //                 this.$bvToast.toast('Salvo com sucesso!', {
      //                     title: 'Atenção',
      //                     variant: 'success',
      //                     toaster:'b-toaster-top-center',
      //                     autoHideDelay: 500
      //                     })  
      //                 })

      //             })
      //             .catch((e) => {console.log(e)})

    },

    onSubmit () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        firebase.database().ref('pessoas').limitToLast(1).once('value')
          .then(res => {
            let result = Object.values(res.val())

            if (!this.dado.id) {
              this.dado.id = res.val() == null ? 1 : result[0].id + 1
            }
            // this.dado.id = res.val()==null ? 1 :result[0].id + 1
            let updates = {}
            updates['/pessoas/' + this.dado.id] = this.dado
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
    validateState (ref) {

      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },

    CarregaDado (itens) {
      console.log(itens)
      this.dado = { ...itens }
      this.$root.$emit('bv::show::modal', 'cadastro', '#btnShow')
    },
    ContaDados () {

      firebase.database().ref('pessoas').once('value')
        .then(res => {
          this.count = Object.values(res.val()).length

          this.CarregaDados()
        })

    },

    CarregaDados () {

      let conta = (this.page * this.limit - this.limit) + 1

      this.start = conta.toString()

      let pessoas_ref = firebase.database().ref('pessoas')
      pessoas_ref.once('value')
        .then(res => {

          let cursor_dados = Object.values(res.val())

          this.dados = cursor_dados



        })
        .catch((e) => { console.log(e) })
    }
  },
  watch: {
    page () {

      this.CarregaDados()
    }
  },
  mounted () {
    this.ContaDados()
  },
}
</script>