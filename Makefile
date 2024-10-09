.PHONY: build push deploy

IMAGE_TAG:=$(shell git rev-parse --short HEAD)
ENV:=$(shell git rev-parse --abbrev-ref HEAD)
IMAGE_NAME='evolytesinc/web'

build:
ifdef DOCKERFILE
	@echo Build image using ${DOCKERFILE} for prod env
	docker build . -t ${IMAGE_NAME}:prod-${IMAGE_TAG} -f ${DOCKERFILE}
else
	@echo Build image using default file for non prod env
	docker build . -t ${IMAGE_NAME}:${IMAGE_TAG}
endif

push:
ifdef DOCKERFILE
	@echo Push image for prod env
	docker push ${IMAGE_NAME}:prod-${IMAGE_TAG}
else
	@echo Push image for non prod env
	docker push ${IMAGE_NAME}:${IMAGE_TAG}
endif

deploy:
ifdef DOCKERFILE
	@echo Deploy to prod env
	helm upgrade --install evolytes-web .k8s/evolytes --namespace production --create-namespace --wait --values .k8s/evolytes/values-prod.yaml --set image.tag=prod-${IMAGE_TAG}
else
	@echo Deploy to non prod env
	helm upgrade --install evolytes-web .k8s/evolytes --namespace evolyte-dev --create-namespace --wait --values .k8s/evolytes/values-staging.yaml --set image.tag=${IMAGE_TAG}
endif
