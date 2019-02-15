<template>
  <html v-if="isNode">
    <head>
      <title>{{title}}</title>
      <meta name="keywords" :content="keywords">
      <meta name="description" :content="description">
      <meta http-equiv="content-type" content="text/html;charset=utf-8">
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </head>
    <body>
      <div id="app"><slot></slot></div>
    </body>
  </html>
  <div v-else-if="!isNode" id="app"><slot></slot></div>
</template>
<script>
  export default {
    computed: {
      isNode() {
        return EASY_ENV_IS_NODE;
      },
      title() {
        return this.meta && this.meta.title || 'Render';
      },
      description() {
        return this.meta && this.meta.description || 'Render-Service';
      },
      keywords() {
        return this.meta && this.meta.keywords || 'Render, Vue Render Service, React Render Service';
      }
    }
  }
</script>