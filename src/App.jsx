import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Cabecalho from './components/Cabecalho.jsx'
import Rodape from './components/Rodape.jsx'
import Avisos from './components/Avisos.jsx'

import Home from './components/Home.jsx'
import Sistema from './components/Sistema.jsx'
import Guia from './components/Guia.jsx'
import Painel from './components/Painel.jsx'
import Manejo from './components/Manejo.jsx'
import Contato from './components/Contato.jsx'

import MicroFazenda from './models/MicroFazenda.js'

// App é o componente principal. Ele guarda o estado da aplicação com useState
// e distribui dados e funções para os componentes filhos por meio de props.
// A navegação entre as páginas é feita com o React Router DOM.
function App() {
    const [fazenda, setFazenda] = useState(function () {
        return MicroFazenda.criarComExemplos()
    })
    const [avisos, setAvisos] = useState([])

    // O React redesenha a tela quando recebe um novo objeto no estado,
    // por isso cada operação guarda uma cópia da micro-fazenda.
    function atualizar() {
        setFazenda(fazenda.clonar())
    }

    function mostrarAviso(texto) {
        const aviso = { id: Date.now(), texto: texto }
        setAvisos(function (anteriores) {
            return anteriores.concat(aviso)
        })
    }

    function fecharAviso(id) {
        setAvisos(function (anteriores) {
            return anteriores.filter(function (a) {
                return a.id !== id
            })
        })
    }

    function adicionarPlantio(idCultura, mudas, local) {
        fazenda.adicionarPlantio(idCultura, mudas, local, 0)
        atualizar()
        mostrarAviso('Plantio registrado. O passo a passo da cultura foi criado.')
    }

    function removerPlantio(id) {
        fazenda.removerPlantio(id)
        atualizar()
        mostrarAviso('Plantio removido.')
    }

    function registrarColheita(id) {
        fazenda.registrarColheita(id)
        atualizar()
        mostrarAviso('Colheita registrada.')
    }

    function simularDias(dias) {
        fazenda.simularDias(dias)
        atualizar()
        mostrarAviso(`${dias} dias simulados.`)
    }

    function limparTudo() {
        fazenda.limpar()
        atualizar()
        mostrarAviso('Painel limpo.')
    }

    function alternarTarefa(idPlantio, idTarefa) {
        fazenda.alternarTarefa(idPlantio, idTarefa)
        atualizar()
    }

    function adicionarTarefa(idPlantio, tipo, descricao, detalhe, diaInicial, repetirCada) {
        fazenda.adicionarTarefa(idPlantio, tipo, descricao, detalhe, diaInicial, repetirCada)
        atualizar()
        mostrarAviso('Atividade adicionada ao plano.')
    }

    function removerTarefa(idPlantio, idTarefa) {
        fazenda.removerTarefa(idPlantio, idTarefa)
        atualizar()
        mostrarAviso('Atividade removida.')
    }

    return (
        <BrowserRouter>
            <Cabecalho />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sistema" element={<Sistema />} />
                <Route path="/guia" element={<Guia />} />
                <Route
                    path="/painel"
                    element={
                        <Painel
                            fazenda={fazenda}
                            aoAdicionar={adicionarPlantio}
                            aoRemover={removerPlantio}
                            aoColher={registrarColheita}
                            aoSimular={simularDias}
                            aoLimpar={limparTudo}
                        />
                    }
                />
                <Route
                    path="/manejo"
                    element={
                        <Manejo
                            fazenda={fazenda}
                            aoAlternarTarefa={alternarTarefa}
                            aoAdicionarTarefa={adicionarTarefa}
                            aoRemoverTarefa={removerTarefa}
                        />
                    }
                />
                <Route path="/contato" element={<Contato aoEnviar={mostrarAviso} />} />
                <Route path="*" element={<Home />} />
            </Routes>

            <Rodape />
            <Avisos lista={avisos} aoFechar={fecharAviso} />
        </BrowserRouter>
    )
}

export default App
