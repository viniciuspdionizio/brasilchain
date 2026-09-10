import React, { Component } from 'react';
import { Container, Card, Button, List } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';

class LicitacoesIndex extends Component {
    static async getInitialProps() {
        // Obtém todas as licitações do LicitacaoFactory e armazena em licitacoes
        const licitacoes = await factory.methods.getAllLicitacoes().call();

        return { licitacoes };
    }

    

    

    render() {
        return (
            <Layout>
                <Link href={'/licitacoes/new'}>
                    <Button>
                        Abrir nova licitação
                    </Button>
                </Link>
                <h4>Licitações abertas: </h4>
                <List divided relaxed>
                    {this.props.licitacoes.map((address, index) => {
                        return (
                        // Faz a iteração em todos os endereços obtidos e mostra em uma lista
                        <List.Item key={index}>
                            <List.Icon name='file text' size='large' verticalAlign='middle' />
                            <List.Content>
                            <Link href={`/licitacoes/${address}`}>
                                <List.Header as='a'>{address}</List.Header>
                            </Link>
                                <List.Description as='a'>Clique para ver os detalhes</List.Description>
                            </List.Content>
                        </List.Item>
                        )
                    })}
                </List>
            </Layout>
        )
}
}

export default LicitacoesIndex;