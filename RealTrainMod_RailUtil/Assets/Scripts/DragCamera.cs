using UnityEngine;

public class DragCamera : MonoBehaviour
{
    public float dragSpeed = 1;
    public Vector3 dragOrigin;

    void Update()
    {
        // ���콺 ���� ��ư�� ������
        if (Input.GetMouseButtonDown(0))
        {
            dragOrigin = Input.mousePosition; // �巡�� ���� ��ġ ����
            return;
        }

        // ���콺 ���� ��ư�� ���� ä�� �̵� ���̸�
        if (!Input.GetMouseButton(0)) return;

        // ���� ���콺 ��ġ�� �巡�� ���� ��ġ�� ���̸� ����Ͽ� �̵��� ����
        Vector3 difference = Input.mousePosition - dragOrigin;

        // �̵� ���� ����
        Vector3 moveDirection = new Vector3(-difference.x, -difference.y, 0).normalized;

        // ī�޶� �̵�(�̵� ����� �ӵ��� ���Ͽ� �̵��� ����)
        Vector3 move = moveDirection * dragSpeed * Time.deltaTime;
        transform.Translate(move, Space.World);

        // Y�� ��ġ ����
        Vector3 currentPosition = transform.position;
        currentPosition.y = 10; // Y���� 0���� ����
        transform.position = currentPosition;

        // ���� ���콺 ��ġ�� �巡�� ���� ��ġ�� ������Ʈ
        dragOrigin = Input.mousePosition;
    }
}
