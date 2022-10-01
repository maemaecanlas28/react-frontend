import React, { useRef } from "react";
import { Grid, Card, Ref, Header } from "semantic-ui-react"
import { DragTypes } from '../Types/DragTypes'
import { useDrag, useDrop } from 'react-dnd'

function OptionsCards({ option, idx, moveCard, userVote }) {

	const ref = useRef(null)
	const [{ handlerId }, drop] = useDrop({
		accept: DragTypes.CARD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = idx

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()

			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			// Determine mouse position
			const clientOffset = monitor.getClientOffset()

			// Get pixels to the top
			const hoverClientY = (clientOffset).y - hoverBoundingRect.top

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			// Time to actually perform the action
			if (userVote == null) {
				moveCard(dragIndex, hoverIndex)
			}

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: DragTypes.CARD,
		item: () => {
			return { id: option.id, index: idx }
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging ? 0 : 1
	drag(drop(ref))

	function getRankByUser() {
		if (userVote != null) {
			const { rankings } = userVote
			const optionIdx = rankings.indexOf(option.id)
			return optionIdx + 1
		}
	}

	return (
		<Ref innerRef={ref}>
			<Grid.Column
				data-handler-id={handlerId}>
				<Card centered className="card-margin">
					{userVote != null ?
						(<div className="one-option-vote">
							<Header
								textAlign="center"
								as='h2'>
								Your rank: {getRankByUser()}
							</Header>
						</div>) : null}
					<div className="card-img-container">
						<img
							className="card-img"
							src={`https://storage.googleapis.com/ranktogether-images/${option.option_image}`} />
					</div>
					<Card.Content>
						<Card.Header>
							<div className="board-option-name">
								{option.name}
							</div>
							<div className="board-option-number">
								<h4> {idx + 1} </h4>
							</div>
						</Card.Header>
					</Card.Content>
				</Card>
			</Grid.Column>
		</Ref>

	)

}

export default OptionsCards