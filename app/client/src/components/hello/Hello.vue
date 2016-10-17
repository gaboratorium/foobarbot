<template>
	<p>Hello {{ audience }}!</p>
</template>

<script>
	module.exports = {
		data: function(){
			return {
				audience: 'everyone' 
			}
		}
	}
</script>

<style>
	p {
		font-size: 2rem;
		text-align: center;
	}
</style>