import React, { Component } from 'react';
import './Tile.css';

export default class Tile extends Component {
    constructor(props) {
        super(props);

        this.tileSpacing = 1;
    }

    getTilePosition() {
        const posX = (this.props.position % this.props.gridSize) * 100;
        const posY = Math.floor(this.props.position / this.props.gridSize) * 100;
        return `translateX(${posX}%) translateY(${posY}%)`;
    }

    getSourceOffset() {
        const offsetX = (this.props.originalPosition % this.props.gridSize) / this.props.gridSize * 100;
        const offsetY = Math.floor(this.props.originalPosition / this.props.gridSize) / this.props.gridSize * 100;
        return `translateX(-${offsetX}%) translateY(-${offsetY}%) translateX(${-this.tileSpacing}px) translateY(${-this
            .tileSpacing}px) `;
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.isVisible !== nextProps.isVisible ||
            this.props.position !== nextProps.position ||
            this.props.originalPosition !== nextProps.originalPosition ||
            this.props.gridSize !== nextProps.gridSize ||
            this.props.source !== nextProps.source ||
            this.props.sceneMaxSize !== nextProps.sceneMaxSize
        );
    }

    render() {
        const tileStyles = {
            width: 100 / this.props.gridSize + '%',
            transform: this.getTilePosition(),
            visibility: this.props.isVisible ? 'visible' : 'hidden'
        };

        const tileContentStyles = {
            margin: this.tileSpacing
        };

        const tileSourceStyles = {
            maxWidth: this.props.sceneMaxSize,
            transform: this.getSourceOffset()
        };

        return (
            <div className="Tile" tile={this.props.originalPosition} style={tileStyles}>
                <div className="Tile-content" style={tileContentStyles}>
                    <img className="Tile-source" style={tileSourceStyles} src={this.props.source} />
                </div>
            </div>
        );
    }
}
