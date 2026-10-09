const funcionalidades = [
    { id: 1, icone: '🌿', titulo: 'Cadastro de culturas', texto: 'Registre informações sobre diferentes tipos de plantas, incluindo requisitos de cultivo e períodos de colheita.' },
    { id: 2, icone: '🪴', titulo: 'Registro de plantio', texto: 'Documente cada plantio com local, quantidade de mudas e variedade cultivada. Mantenha o histórico de todas as operações.' },
    { id: 3, icone: '📊', titulo: 'Acompanhamento do ciclo', texto: 'Visualize o estágio de cada plantio, desde a fase inicial até a maturação, com previsão de colheita.' },
    { id: 4, icone: '💧', titulo: 'Rotinas de manejo', texto: 'Um passo a passo por cultura, do plantio à colheita, com as atividades na ordem dos dias e as doses calculadas pela quantidade de mudas.' },
    { id: 5, icone: '🧺', titulo: 'Registro de colheita', texto: 'Encerre o ciclo produtivo registrando a colheita e mantenha o histórico de produção disponível.' },
    { id: 6, icone: '✅', titulo: 'Painel de produção', texto: 'Visualize um resumo com plantios ativos, próximas colheitas e tarefas pendentes em um único lugar.' }
]

function CardFuncionalidade({ icone, titulo, texto }) {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100">
                <div className="card-body">
                    <div className="icone-card">{icone}</div>
                    <h3 className="h5 card-title">{titulo}</h3>
                    <p className="texto-suave mb-0">{texto}</p>
                </div>
            </div>
        </div>
    )
}

function Sistema() {
    return (
        <div>
            <header className="hero">
                <div className="container">
                    <h1 className="display-5 serif mb-3">Um sistema para gerenciar a rotina da produção.</h1>
                    <p>
                        Acompanhe culturas, plantios, manejos e colheitas com uma estrutura simples,
                        acessível e adequada à produção em pequena escala.
                    </p>
                </div>
            </header>

            <main>
                <section className="secao">
                    <div className="container">
                        <div className="text-center mb-5">
                            <h2 className="titulo-secao">Funcionalidades principais</h2>
                            <p className="texto-suave">
                                Recursos essenciais para organizar a operação de uma micro-fazenda vertical.
                            </p>
                        </div>
                        <div className="row g-4">
                            {funcionalidades.map(function (f) {
                                return (
                                    <CardFuncionalidade
                                        key={f.id}
                                        icone={f.icone}
                                        titulo={f.titulo}
                                        texto={f.texto}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="secao bg-verde-suave">
                    <div className="container">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-5">
                                <h2 className="titulo-secao">Para quem foi pensado</h2>
                                <p className="texto-suave">
                                    O sistema é desenvolvido com foco em simplicidade e acessibilidade para diferentes públicos.
                                    Não é necessário conhecimento técnico avançado para operá-lo.
                                </p>
                            </div>
                            <div className="col-lg-7">
                                <ul className="list-group">
                                    <li className="list-group-item">Condomínios que querem implantar hortas verticais em áreas comuns.</li>
                                    <li className="list-group-item">Escolas e centros comunitários que desejam organizar a produção local.</li>
                                    <li className="list-group-item">Projetos sociais que precisam de rotina simples de plantio, manejo e colheita.</li>
                                    <li className="list-group-item">Voluntários e responsáveis pela operação diária da horta.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Sistema
