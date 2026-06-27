from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


tasks = [
 
]


def get_all_tasks():
    task_list = []
    for task in tasks:          
        task_list.append(task)
    return task_list


def add_new_task(task):
    tasks.append(task)


def delete_task(index):
    if 0 <= index < len(tasks):
        tasks.pop(index)


def edit_task(index, new_task):
    if 0 <= index < len(tasks):
        tasks[index] = new_task


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/tasks")
def get_tasks():
    return jsonify(get_all_tasks())


@app.route("/add", methods=["POST"])
def add():
    data = request.json
    add_new_task(data["task"])
    return jsonify(success=True)


@app.route("/delete/<int:index>", methods=["DELETE"])
def delete(index):
    delete_task(index)
    return jsonify(success=True)


@app.route("/edit/<int:index>", methods=["PUT"])
def edit(index):
    data = request.json
    edit_task(index, data["task"])
    return jsonify(success=True)



def count_tasks():
    count = 0
    for task in tasks:      
        count += 1
    return count


if __name__ == "__main__":
    print("Total Tasks:", count_tasks())
    app.run(debug=True)