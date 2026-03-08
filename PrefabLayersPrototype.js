// Note: This isn't production code, very crude test code
function bzwParseToJS(instr,namejs) {
  let builder=[];
  let lines = instr.split("\n");
  let selected=0;
  builder.push("function ".concat(namejs,"(xpos, ypos, zpos) {"));
  builder.push("  let builder=[];");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trimStart();
    if (line.length > 2) {
      if (line.indexOf("#") !== 0) {
        let data = line.split(" ");
        let obj = data[0].trim().toLowerCase();
        if ((obj == "vertex") || (obj == "inside") || (obj == "position")) {
          let xvs = parseFloat(data[1].trim());
          let yvs = parseFloat(data[2].trim());
          let zvs = parseFloat(data[3].trim());
          builder.push("  builder.push(\"".concat(obj,"\".concat(\" \", (xpos + ", xvs,"),\" \",(ypos + ",yvs,"),\" \", (zpos +",zvs,")));"));
          // TODO: Rewrite as a better expression. Way too confusing for later updates.
          // Ref: We create builder, feed it another builder, concat our current values and tie in math expressions to them.
        } else {
          builder.push("  builder.push(\"".concat(line,"\");"));
        }
      }// else console.log(line);
    }
  }
  builder.push("  return builder.join(\"\\n\");");
  builder.push("}");
  return builder.join("\n");
}
