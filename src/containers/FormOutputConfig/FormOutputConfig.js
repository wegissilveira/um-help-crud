import React, { Component } from 'react'

import classes from './FormOutputConfig.module.css'

import ProductComponent from '../../components/ProductComponent/ProductComponent'
import ProductComponentMobile from '../../components/ProductComponentMobile/ProductComponentMobile'
import * as productActions from '../../store/actions/index'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux'


class FormOutputConfig extends Component {
    
    removeProductHandler = id => {
        const productsList = 
            this.props.productsList.filter(product => 
                product.id !== id
            )

        this.props.onPostProducts(productsList)
    }

    
    updateQtdeHandler = (arg, id) => {

        let productsList = this.props.productsList.map(product => {
            return {...product}
        })
        
        let qtde = null

        productsList.forEach((product, i) => {
            if (product.id === id) {
                if (arg === 'up') {
                    productsList[i].qtde = product.qtde+1
                    productsList[i].valorTotal = product.qtde * product.valor
                }

                if (arg === 'down') {
                    productsList[i].qtde = product.qtde-1
                    productsList[i].valorTotal = product.qtde * product.valor
                }

                qtde = productsList[i].qtde
            }
        })

        if (qtde > 0) {
            this.props.onPostProducts(productsList)
        } else {
            this.removeProductHandler(id)
        }
        
    }


    render () {
        return (
            <div className={classes.FormOutput_container}>
                <div>
                    <h2>Lista De Produtos</h2>
                </div>
                <div className={classes.Search_container}>
                    <FontAwesomeIcon 
                        icon="search" 
                        color="rgb(126, 125, 125)"
                    />
                    <input placeholder="Busca por produtos" />
                </div>
                <div className={classes.FormOutput_header}>
                    <p>ID</p>
                    <p>Nome</p>
                    <p>Quantidade</p>
                    <p>Valor Unitário</p>
                    <p>Valor Total</p>
                    <p></p>
                </div>
                
                {/* ** */}

                <ProductComponent 
                    products={this.props.productsList} 
                    removeProduct={(id) => this.removeProductHandler(id)}
                    updateProduct={(arg, id) => this.updateQtdeHandler(arg, id)}
                />

                <ProductComponentMobile 
                    products={this.props.productsList}  
                />                
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        productsList: state.productsDataState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostProducts: products =>
            dispatch(productActions.postProducts(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormOutputConfig)