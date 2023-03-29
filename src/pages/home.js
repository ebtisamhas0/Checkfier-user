import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
export class Home extends Component {
    constructor(props){

        super(props)
        this.state = {
          delay: 100,
          result: 'No result',
        }
    
        this.handleScan = this.handleScan.bind(this)
      }
      handleScan(data){
        this.setState({
          result: data
          
        })

      }
      handleError(err){
        console.error(err)
      }
      navigate(){
        
      }
      render(){
        const body= {
          alignItems: 'center',
          justifyContent: 'center',
          
        }
        const previewStyle = {
          height: 400,
          width: 280,
          justifyContent: "center"
      
        }
        const txt = {
          color: '#342802',
        } 
    
        return(
          <div style={body}>
            
            <QrReader
              delay={this.state.delay}
              style={previewStyle}
              onError={this.handleError}
              onScan={ this.handleScan } />
            <p>{this.state.result}</p>
            <div style={txt}>
              <h4>Scan QR Code To get points</h4>
            </div>
         
            </div>
        )
      }
    }


