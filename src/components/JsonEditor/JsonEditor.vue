<template>
  <div class="json-editor">
    <label>
      <textarea ref="textarea"/>
    </label>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import CodeMirror, {Editor} from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css";
require('script-loader!jsonlint');
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";

@Component
export default class JsonEditor extends Vue {
  jsonEditor!: Editor;

  @Prop({required: true})
  value!: [any[], Object];

  @Watch('value')
  changeValue(value: string, oldValue: string) {
    let val = JSON.stringify(value, null, 2);
    const editorValue = this.jsonEditor.getValue();
    if (val !== editorValue) {
      this.jsonEditor.setValue(val)
    }
  };

  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea((this.$refs as any).textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    });

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue());
      this.$emit('input', cm.getValue())
    })
  };

  getValue() {
    return this.jsonEditor.getValue()
  }

}
</script>

<style scoped>

  .json-editor {
    position: relative;
    height: 100%;
  }

  .json-editor >>> .CodeMirror {
    height: auto;
    min-height: calc(100vh - 220px);
  }

  .json-editor >>> .CodeMirror-scroll {
    min-height: calc(100vh - 220px);
  }

  .json-editor >>> .cm-s-rubyblue span.cm-string {
    color: #f08047;
  }

  .json-editor >>> .cm-s-rubyblue .CodeMirror-gutters {
    padding-right: 10px;

    /* background: transparent; */
    border-right: 1px solid #fff;
  }

  .json-editor >>> .cm-s-rubyblue.CodeMirror {
    /* background: #08233e; */
    color: white;
  }
</style>
