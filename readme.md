
Matrix practise. Simulating water movement in a matrix.

Using Pixi for rendering inside a React powered application, to practise this combo too. (not using react-pixi, going bareback)

Reach goals:
* Add solid walls
* Add edges to the matrix that denote slope

Edges denoting slope is a fun one. This could be calculated by each cell by comparing its own height to its neighbours, but this is quite wasteful to do as part of the general iteration. We can calculate these early, store them as data in edge nodes and use those edges to help each 'chunk' of water to navigate.
