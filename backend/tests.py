import requests

BASE_URL = "http://localhost:8000/tasks"

def test_create_task():
    new_task = {
        "name": "тестовая задача",
        "description": "блаблабла",
        "status": "todo"
    }
    response = requests.post(BASE_URL, json=new_task)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == new_task["name"]
    assert data["description"] == new_task["description"]
    assert data["status"] == new_task["status"]


def test_get_task_by_id():
    new_task = {
        "name": "тестова задача по айдишнику",
        "description": "балалааа",
        "status": "todo"
    }
    create_response = requests.post(BASE_URL, json=new_task)
    assert create_response.status_code == 201
    created_task = create_response.json()
    task_id = created_task["id"]
    response = requests.get(f"{BASE_URL}/{task_id}/")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == task_id
    assert data["name"] == new_task["name"]


def test_filter_tasks_by_status():
    tasks = [
        {"name": "1", "description": "11", "status": "todo"},
        {"name": "2", "description": "12", "status": "in_progress"},
        {"name": "3", "description": "13", "status": "done"},
    ]

    for task in tasks:
        response = requests.post(BASE_URL, json=task)
        assert response.status_code == 201
    response = requests.get(f"{BASE_URL}?status=todo")
    assert response.status_code == 200
    data = response.json()
    todo_tasks = [task for task in tasks if task["status"] == "todo"]

    assert len(data) >= len(todo_tasks)
    for task in data:
        assert task["status"] == "todo"
