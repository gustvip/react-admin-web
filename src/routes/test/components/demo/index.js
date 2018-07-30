//import CesiumComponent from 'templates/tool_components/cesium'
import T from 'utils/t'

export default class Component extends React.PureComponent {
	constructor () {
		super()
		this.viewer = null
	}
	
	componentDidMount () {
		console.log(this.powerSet([1, 2, 3]))
	}
	
	powerSet (originalSet) {
		const subSets = []
		
		const numberOfCombinations = 2 ** originalSet.length
		for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
			const subSet = []
			
			for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
				// Decide whether we need to include current element into the subset or not.
				if (combinationIndex & (1 << setElementIndex)) {
					subSet.push(originalSet[setElementIndex])
				}
			}
			
			subSets.push(subSet)
		}
		
		return subSets
	}
	
	render () {
		return (
			<div>hello</div>
		)
	}
}
